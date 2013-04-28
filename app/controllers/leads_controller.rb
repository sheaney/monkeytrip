class LeadsController < ApplicationController
  def create
    @lead = Lead.new(email: params[:email])
    if @lead.save
      respond_to do |format|
        format.json { render json: {}, status: :ok }
      end
    else
      respond_to do |format|
        format.json { render json: {}, status: :unprocessable_entity }
      end
    end
  end
end
